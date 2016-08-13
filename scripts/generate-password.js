app.factory('generatePassword', function() {
   return function(opts) {
       var length = 16;
       if (opts && opts.length && (typeof opts.length == 'number')) {
           length = opts.length;
       }

       var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/.?,;:!*$=+}])@_-[({\'"#~&<>';
       if (opts && opts.pool && (typeof opts.pool == 'string')) {
           pool = opts.pool;
       }

       var to_exclude = 'iIL1o0O';
       var exclude_similars = true;
       if (opts && opts.exclude_similars && (typeof opts.exclude_similars == 'boolean')) {
           exclude_similars = opts.exclude_similars;
       }

       var password = '';

       for(var i = 0 ; i < length ; i++) {
           var random = parseInt(Math.random() * (pool.length - 0) + 0);
           var character = pool[random];
           if (to_exclude.indexOf(character) >= 0) {
               i--;
           } else {
               password += character;
           }
       }
       return password;
   };
 });
