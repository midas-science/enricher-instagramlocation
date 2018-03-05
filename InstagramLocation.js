"use strict";
var InstagramLocation = class InstagramLocation {
	
  constructor(rp, data, config) {
    this.data = data;
    this.rp = rp;
    this.config = config;
  }

  getConfig() {
    return this.config;
  }

  getName() {
    return 'Instagram Location';
  }

  setData(data) {
    this.data = data;
  }

  process(data) {    

    if(typeof data != 'undefined' && data != null) {
      this.data = data;
    }  

    let req_url = 'https://api.instagram.com/v1/locations/'+encodeURIComponent(data);
    let options = {
      uri: req_url, 
      qs: {
          access_token: this.config.access_token
      },
      headers: {
        'User-Agent': 'midas'
      },
      json: true // Automatically parses the JSON string in the response
    };
    return this.rp(options).then((result) => {
      let _result = [];

      try {
        _result = {
          lng: result.data.longitude,
          lat: result.data.latitude
        }
      } catch(e) {
        _result = {
          lng: null,
          lat: null
        }
      }

      return Promise.resolve(_result);
    }).catch((err) => {
      return Promise.resolve('ERROR_NO_RESULT');
    });
  }
};

module.exports.InstagramLocation = InstagramLocation;