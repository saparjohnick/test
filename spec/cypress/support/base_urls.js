import config from './config'

export default {
  getBaseUrl: (subdomain) => {
    subdomain = subdomain ? subdomain : config.DEFAULT_SUBDOMAIN
    return `${config.PROTOCOL}://${subdomain}.${config.HOST}`
  }
}
