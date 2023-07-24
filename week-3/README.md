## Introduction to ReactJS

Bundler Nedir?

Web Application Bundler (WAB) adı üzerinde, web uygulamalarının geliştirilmesinde kullandığımız ve bir uygulamanın ihtiyaç duyduğu tüm kaynakları bir arada bulundurulmasını sağlayan bundler’ları tanımlar. JavaScript Module Bundler olarak da karşınıza çıkabilecek bu araçlar (Node.js tabalı olmaları sebebiyle) en temelde JavaScript dosyalarını referans alarak işlemler gerçekleştirirler. Bir bundler “meta-tool” olarak da ifade edilebilir, böylelikle bir geliştiricinin ihtiyaç duyduğu tüm araçlar (eklentiler, alt araçlar vb.) bir arada, uyumlu bir şekilde işler.

Proje yayına hazır şekilde düzenlenir, hatalardan arındırılır, sıkıştırılır, derlenir (minify, concatenate, uglify vb.).

![web app architecture](https://ceaksan.com/tr/web-application-module-bundler-nedir/web-app-mimarisi.jpg)


Bundler Faydaları
* Kolay içe aktarım
    * ```js
        // dosya yolu ./src/core.js 
        var _ = require('../node_modules/lodash/lodash.js');

        // dosya yolu ./src/app/main.js
        var _ = require('../../node_modules/lodash/lodash.js'); 
        
        // herhangi bir yer
        var _ = require('lodash');
      ```
* Farklı dosya tiplerini ekleme imkanı sunar
    * ```js
      import ‘./core.js’;
      import ‘./style.css’;
      const template = require(‘./view.html’);
      ```
* Yazılan kodu minimize eder (bundler size) optimize etmemizi sağlar
* Bütün tarayıcılar için yazılan kodları indirgemeye(downgrade) ve tarayıcı uyumluluğunu sağlar.
    * Babel sayesinde modern dil versiyonlarını kullanmamıza imkan sağlar
* **test** **build** **watch** gibi komutları kullanmamızı sağlar
  ```json
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack --mode=production --node-env=production",
      "build:dev": "webpack --mode=development",
      "build:prod": "webpack --mode=production --node-env=production",
      "watch": "webpack --watch",
      "serve": "webpack serve"
    },
  ```

WebPack config dosyası
```js
    // Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
	? MiniCssExtractPlugin.loader
	: "style-loader";

const config = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		open: true,
		host: "localhost",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
		}),

		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(js|jsx)$/i,
				loader: "babel-loader",
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, "css-loader", "postcss-loader"],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: "asset",
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = "production";

		config.plugins.push(new MiniCssExtractPlugin());

		config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
	} else {
		config.mode = "development";
	}
	return config;
};
```

## CLI Nedir?

Programları çalıştırmaya,yönetmeye ve etkileşim içinde kalmayı sağlayan text-based arayüzleridir.

En çok kullanılan CLI lar

![CLI-RANK](https://miro.medium.com/v2/resize:fit:720/format:webp/1*8qh2O6sg9qIYWsEXH9HRXA.png)
