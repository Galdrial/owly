const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Entry point: main JavaScript file
  entry: './src/assets/js/index.js',
  
  // Dove salvare il bundle finale
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Pulisce la cartella dist ad ogni build
  },
  
  // Modalità di sviluppo (cambia a 'production' per la produzione)
  mode: 'development',
  
  // Source maps per debugging
  devtool: 'inline-source-map',
  
  // Configurazione del dev server
  devServer: {
    static: './dist',
    port: 3000,
    open: true, // Apre automaticamente il browser
    hot: true,  // Hot Module Replacement
  },
  
  // Loaders per gestire diversi tipi di file
  module: {
    rules: [
      {
        // Per i file CSS
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Per le immagini
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        // Per i font
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  // Plugin
  plugins: [
    // Carica variabili d'ambiente dal file .env
    new Dotenv(),
    // Genera automaticamente index.html che include il bundle
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Owly App',
    }),
  ],
};
