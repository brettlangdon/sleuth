(function(window, document){
  if(window.Sleuth !== undefined){
    return;
  }

  if(!window.btoa){
    var base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
    window.btoa = function(data){
      var result = '';
      var padding = '';
      var padCount = data.length % 3;

      if(padCount > 0){
        for(; padCount < 3; ++padCount){
          padding += '=';
          data += '\0';
        }
      }

      for(var i = 0; i < data.length; i += 3){
        var next = (data.charCodeAt(i) << 16) + (data.charCodeAt(i + 1) << 8) + data.charCodeAt(i + 2);
        next = [(next >>> 18) & 63, (next >>> 12) & 63, (next >>> 6) & 63, next & 63];
        result += base64chars[next[0]] + base64chars[next[1]] + base64chars[next[2]] + base64chars[next[3]];
      }

      return result.substring(0, result.length - padding.length) + padding;
    };
  }

  var encodeObject = function(data){
    var query = [];
    for(var key in data){
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    };

    return query.join('&');
  };

  var post = function(url, data, tags){
    var req = new XMLHttpRequest();
    url += '?' + encodeObject(tags);
    req.open('POST', url, true);
    req.send(JSON.stringify(data));
  };

  var drop = function(url, data, tags){
    tags.d = window.btoa(JSON.stringify(data));
    tags.n = new Date().getTime();
    tags.r = Math.random() * 99999999;
    url += '?' + encodeObject(tags);
    document.write('<sc' + 'ript type="text/javascript" src="' + url + '"></scri' + 'pt>');
  };

  var Sleuth = function(){
    this.version = '0.1.0';
    this.config = {
      url: '/track',
      unload: true,
      ajax: true,
      performance: true,
      useLocalStorage: true,
    };

    this.tags = {};
    this.data = {};
  };

  Sleuth.prototype.init = function(options){
    for(var key in options){
      this.config[key] = options[key];
    }
  };

  Sleuth.prototype.captureWindowPerformance = function(){
    if(this.config.performance && window.performance !== undefined){
      if(window.performance.timing !== undefined){
        this.data.timing = window.performance.timing;
      }
      if(window.performance.navigation !== undefined){
        this.data.navigation = {
          redirectCount: window.performance.navigation.redirectCount,
          type: window.performance.navigation.type,
        };
      }
    }
  };

  Sleuth.prototype.onunload = function(){
    if(this.config.performance){
      this.captureWindowPerformance();
    }
    if(this.config.unload){
      this.sendAllData();
    }
  };

  Sleuth.prototype.sendData = function(data){
    if(this.config.ajax){
      post(this.config.url, data, this.tags);
    } else {
      drop(this.config.url, data, this.tags);
    }
  };

  Sleuth.prototype.sendAllData = function(){
    var toSend = this.data;
    this.data = {};
    if(this.config.useLocalStorage){
      for(var key in window.localStorage){
        if(key.indexOf('Sleuth:') === 0){
          var value = window.localStorage.getItem(key);
          window.localStorage.removeItem(key);
          key = key.substring(6);
          toSend[key] = value;
        }
      }
    }
    this.sendData(this.config.url, toSend, this.tags);
  };

  Sleuth.prototype.track = function(key, value){
    if(this.config.useLocalStorage && window.localStorage !== undefined){
      window.localStorage.setItem('Sleuth:' + key, value);
    } else {
      this.data[key] = value;
    }
  };

  Sleuth.prototype.tag = function(key, value){
    this.tags[key] = value;
  };

  window.Sleuth = new Sleuth();
  window.onbeforeunload = window.Sleuth.onunload.bind(window.Sleuth);
})(window, document);
