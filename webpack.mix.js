let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.combine(['public/adminPanel/cms/plugins.js','public/adminPanel/cms/wds_script.js','public/adminPanel/cms/why-staysure.js'], 'public/js/wp.min_new.js');
    // .js('public/adminPanel/javascript-edit-hotel/test.js','public/js/app.js');
