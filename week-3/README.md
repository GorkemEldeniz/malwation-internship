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

Vite neden bu kadar popüler?

Vite projedeki bağımlılıkları pre-bundle ederken esbuild kullanıyor.Esbuild diğer bundler'lara göre 10-100x daha hızlı performans veriyor.

Diğer Bundlerların çalışma mantığı
![Bundler](https://miro.medium.com/v2/resize:fit:720/format:webp/1*EcVlu5OOebUL06xnZWVaTg.png)

Vite ve Snowpack'in çalışma mantığı
![Vite,snowpack](https://miro.medium.com/v2/resize:fit:720/format:webp/1*qKT6c5NA8iq80saCyFcByw.png)

## Linter ve Formatter Nedir

Linter
* Temel çalışma mantığı; bir takım kurallar doğrultusunda kodunuzu tarayıp bunun ile ilgili uyarıları vererek geliştiricileri uyarıyor. Bir çok kod editörü ve boilerplate yapılarda hazır olarak geliyor. Örneğin React Geliştirme Ortamının Oluşturulması sırasında kod paketinin içerisine hazır olarak kurulmuş oluyor.
* Eslint

Formatter
* Formatter, geliştiricilerin kodlarını standart ve tutarlı bir şekilde otomatik olarak biçimlendirmelerini sağlayan popüler bir kod biçimlendirme aracıdır.
* Prettier

## React

React  tek sayfa uygulamalar için kullanıcı arayüzü oluşturmak ve geliştirmek amacıyla yapılan bir JavaScript kütüphanesidir(framework değil).

**declarative** yapısını kullanır kod okunaklığı ve geliştirici deneyimi açısında çok iyi bir özelliktir.

Yazılan Kod
![declarative](https://miro.medium.com/v2/resize:fit:720/format:webp/1*u94yCCRukpbbePtqah8ASA.png)

Sonuç
![production](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Jhfz8ACItuBUlyELylDviQ.png)

JSX Nedir?

Kolayca html ve javascripti içi içe kullanmamızı sağlayan react in kullandığı bir yazım türüdür.

JSX öneği
```js
	const jsx = <h1>This is JSX</h1>
```

JSX ile class yapısındaki kullanım
```js

	class JSXDemo extends React.Component {
    render() {
        return <h1>This is JSX</h1>;
    	}
	}
```

Yukarıdaki react kodunun Babel ile dönüştürülmüş hali

```js
	class JSXDemo extends React.Component {
    render() {
        return React.createElement("h1", null, "This is JSX");
    }
}
```

React.createElement yapısı

```js
	React.createElement(type, [props], [...children])

	// verilen parametreleri bu şekilde objeleler gösterilebilir
	{   
		type: 'h1',   
		props: {     
			children: 'This is JSX'   
		}
	}
```

Fragment ya da wrapper olamadan birden çok elemanı dönme şekli
```js
	import React from "react";
	import ReactDOM from "react-dom";

	const App = () => {
		return (
			[<p key="first">This is first JSX Element!</p>,<p key="second">This is another JSX Element</p>]
		);
	};

	const rootElement = document.getElementById("root");
	ReactDOM.render(<App />, rootElement);
```

Custom react createElement Function

 ```js
	const React = {
    createElement: function (tag, attrs, children) {
        var element = document.createElement(tag);

        for (let name in attrs) {
            if (name && attrs.hasOwnProperty(name)) {
                let value = attrs[name];
                if (value) {
                    element.setAttribute(name, name);
                } else if (value != null) {
                    element.setAttribute(name, value.toString());
                }
            }
        }
        for (let i = 2; i < arguments.length; i++) {
            let child = arguments[i];
            element.appendChild(
                child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
        }
        return element;
    }
};
```

Virtual DOM Ve React


