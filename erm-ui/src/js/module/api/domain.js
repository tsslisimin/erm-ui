let hostname = window.location.hostname
let port = window.location.port || 80
let hostConfig = {
  'home.xiaoxuezha.com': {
    host: 'http://home.xiaoxuezha.com'
  },
  'erm.comezx.com': {
    host: 'http://erm.comezx.com'
  },
  'ermtest.comezx.com': {
    host: 'http://ermtest.comezx.com'
  },
  'localhost': {
    host: 'http://ermtest.comezx.com'
  }
}

//let domain = hostConfig[hostname]
let domain = {
  //+ ':' + port
  host: 'http://192.168.0.103:9091'
  // host: 'http://118.24.101.28'
};
export {domain}
