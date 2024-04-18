const path = require("path");

module.exports = {
	entry: "./src/script.js", // Entry point of your Electron renderer code
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "src/build"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};
