class Utils {
  static readSeeds(el) {
    var seeds = JSON.parse(localStorage.getItem('cySeeds'));
    return el ? seeds[el] : seeds;
  }

  static getRandomEmail(domain = 'email.com') {
    var time = new Date().getTime();
    return 'fake_' + time + '@' + domain;
  }

  static getPassword() {
    return 'password';
  }

  static getRandomText() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  }

  static getExampleUrl() {
    return 'http://example.com/';
  }
}

export default Utils;