# cookie-baker

Handle cookies in a easy way

## Usage

### install

npm i cookie-baker

### example using in browsers (including IE11) with live-server

````javascript
    <script src="node_modules/cookie-baker/dist/bundle.js"></script>
    <script>
        var cookies = cookieFactory()
        cookies.setCookie('coffeeType', 'mocha')
        var cookieValue = cookies.getCookie('coffeeType')
        console.log('get cookie', cookieValue) //get cookie mocha
        cookies.deleteCookie('coffeeType');
        console.log('deleted cookie', cookies.getCookie('coffeeType')) //deleted cookie null
    </script>
````

Methods availables
- [getCookie](#getcookie)
- [setCookie](#setcookie)
- [deleteCookie](#deletecookie)


### getCookie

cookies.getCookie(key [, isString=false, markAsErasable=false ]);

If you need to retrieve a cookie value from cookies, just give it the key:

````javascript
//document.cookie -> "foo=idunno; bar=firstValue"

var myValue = cookies.getCookie('foo');
console.log('my value', myValue);//idunno

var otherValue = cookies.getCookie('inexistent');
console.log(otherValue);//null
````

### setCookie

cookies.setCookie(key, value [, daysToExpire=365 ]);

to set a new cookie value, just give it the key and its value. Optionally, you can send how many days your cookie will survive.

````javascript
cookies.setCookie('coffeeType', 'mocha');

//cookie="foo=idunno; bar=firstValue; coffeeType=mocha"
````


### deleteCookie

cookies.deleteCookie(key);

To remove a cookie, just pass the key.

````javascript
//cookie="foo=idunno; bar=firstValue"

cookies.deleteCookie('foo');

//cookie="bar=firstValue"
````