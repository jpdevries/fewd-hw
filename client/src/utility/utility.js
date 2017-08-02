// these functions are used on the front end and back end, making this file isomorphic

export const randomRange = function(min, max) {
  return min + Math.random() * (max - min)
}

export const reduceArrayFrequency = function(arr, freq) {
  if(arr.length <= freq) return arr;

  const newArray = [];
  const inc = Math.floor(arr.length / freq);

  for(let i = 0; i < arr.length; i += inc) {
    newArray[i] = arr[i];
  }

  return newArray.filter(n => n);
}

export function makeURL(str, params) {
  //console.log('makeURL', str, params);
  try {
    var url = new URL(str, window.location.origin); // #janky note: probably need to variabilize baseUrl
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
  } catch(e) {
    console.log(e);
    var url = (str.indexOf('?') > -1) ? `${str.substr(0, str.indexOf('?'))}?` : `${str}?`;
    let ps = [];
    Object.keys(params).forEach(key => ps.push(`${key}=${params[key]}`) );
    url += ps.join('&');
    return url;
  }
}
