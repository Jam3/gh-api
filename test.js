var ghApi = require('./')
var test = require('tape')
var parseLink = require('parse-link-header')

test('reads contents as json', function (t) {
  t.plan(2)
  ghApi('repos/mattdesl/budo/contents/package.json', {
    query: {
      ref: 'bb0fba6cf19ee6eeda5415f9b2651110a42e0e39'
    }
  }, function (err, data, res) {
    if (err) return t.fail(err)
    t.equal(res.statusCode, 200, 'got pakacage')

    var str = new Buffer(data.content, data.encoding).toString()
    var pkg = JSON.parse(str)
    t.equal(pkg.version, '3.0.4', 'query.ref is correct')
  })
})

test('provides response headers', function (t) {
  t.plan(1)
  ghApi('repositories', function (err, data, res) {
    if (err) return t.fail(err)
    var links = parseLink(res.headers.link)
    t.ok(links && links.next && links.next.url, 'got next url')
  })
})
