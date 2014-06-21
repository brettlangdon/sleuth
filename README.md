Sleuth.js
========

## Configuration Settings

* `url` - url/endpoint where to send all data (default: `/track`)
* `unload` - whether or not to call `sendAllData` on `window.onbeforeunload` (default: `true`)
* `ajax` - whether or not to use ajax to send data to `url` (default: `true`)\
* `performance` - whether or not to include `window.performance` data on `window.onbeforeunload` (default: `true`)
* `useLocalStorage` - whether or not to use `window.localStorage` to store page data if supported (default: `true`)

### AJAX
If `true` a normal ajax POST request is sent to `url` with the page `tags` encoded as url
query string parameters and the page `data` is posted as a JSON object.

If `false` a javascript pixel is dropped pointing to `url` with the page `tags` encoded as url
query string parameters and where the page `data` is added to the query string `d` where the
value is a url escaped base64 encoded version of the JSON object.


### LocalStorage
If `useLocalStorage` is `true` and LocalStorage is supported on the client then `window.localStorage`
is used to store all page data, meaning data can be persisted between page requests.

Otherwise the data is stored in an object and is volatile.

## Usage

Include js on your page:

```html
<script type="text/javascript" src="https://raw.githubusercontent.com/brettlangdon/sleuth/master/sleuth.min.js"></script>
```

### Configure
You can configure custom settings like so:
```html
<script type="text/javascript">
Sleuth.init({
  url: '/endpoint',
  unload: false,
  // other options here
});
</script>
```

### Tagging the Page
Add tags to the session:
```html
<script type="text/javascript"/>
Sleuth.tag('user', 'guest');
</script>
```

### Tracking Data
Track some data:
```html
<script type="text/javascript">
Sleuth.track('clicks', 5);
</script>
```

### Syncing Data
Manually send some data:
```html
<script type="text/javascript">
Sleuth.sendData({
  key: 'value',
});
</script>
```

Manually send all data:
```html
<script type="text/javascript">
Sleuth.sendAllData();
</script>
```

Manually add `window.performance` data to `Sleuth`:
```html
<script type="text/javascript">
Sleuth.captureWindowPerformance();
</script>
```


## License
```
The MIT License (MIT) Copyright (c) 2014 Brett Langdon <brett@blangdon.com> (http://brett.is)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
