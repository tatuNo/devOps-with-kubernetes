import k8s from '@kubernetes/client-node'
import JSONStream from 'json-stream'
import request from 'request'
import mustache from 'mustache'
import scrape from 'website-scraper'
import SaveToExistingDirectoryPlugin from 'website-scraper-existing-directory';
import { readFile } from 'fs/promises'

const kc = new k8s.KubeConfig();

kc.loadFromCluster()

const opts = {}
kc.applyToRequest(opts)

const client = kc.makeApiClient(k8s.CoreV1Api);
                                                     
const sendRequestToApi = async (api, method = 'get', options = {}) => new Promise((resolve, reject) => request[method](`${kc.getCurrentCluster().server}${api}`, {...opts, ...options, headers: { ...options.headers, ...opts.headers }}, (err, res) => err ? reject(err) : resolve(JSON.parse(res.body))))

const fieldsFromDummysite = (object) => ({
  name: `${object.metadata.name}-dummysite`,
  namespace: object.metadata.namespace,
  website_url: object.spec.website_url,
})

const getYAML = async (fields, file) => {
  const deploymentTemplate = await readFile(file, "utf-8")
  return mustache.render(deploymentTemplate, fields)
}

const createIngress = async (fields) => {
  const yaml = await getYAML(fields, "./mustache/ingress.mustache")

  return sendRequestToApi(`/apis/networking.k8s.io/v1/namespaces/${fields.namespace}/ingresses`, 'post', {
    headers: {
      'Content-Type': 'application/yaml'
    },
    body: yaml
  })  
}

const createDeployment = async (fields) => {
  const yaml = await getYAML(fields, "./mustache/deployment.mustache")

  return sendRequestToApi(`/apis/apps/v1/namespaces/${fields.namespace}/deployments`, 'post', {
    headers: {
      'Content-Type': 'application/yaml'
    },
    body: yaml
  })
}

const createService = async (fields) => {
  const yaml = await getYAML(fields, "./mustache/service.mustache")

  return sendRequestToApi(`/api/v1/namespaces/${fields.namespace}/services`, 'post', {
    headers: {
      'Content-Type': 'application/yaml'
    },
    body: yaml
  })
}

const scrapeSite = async (url) => {
  console.log("Scrape:", url)

  const options = {
    urls: url,
    directory: './files',
    plugins: [ new SaveToExistingDirectoryPlugin() ]
  }

  return await scrape(options)
}

 const maintainStatus = async () => {
  (await client.listPodForAllNamespaces()).body 

  const countdown_stream = new JSONStream()

  countdown_stream.on('data', async ({ type, object }) => {
    const fields = fieldsFromDummysite(object)

    if (type === 'ADDED') {
      scrapeSite(fields.website_url)
      console.log('Service', await createService(fields))
      console.log('Deploy', await createDeployment(fields))
      console.log('Ing', await createIngress(fields))
    }
  })
 
  request.get(`${kc.getCurrentCluster().server}/apis/stable.tatuno/v1/dummysites?watch=true`, opts).pipe(countdown_stream)
}

maintainStatus()