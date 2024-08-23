//@see https://github.com/mde/ejs/blob/main/lib/utils.js

import * as fs from 'fs';
import { Template } from "./template";

let hasOwnProperty = Object.prototype.hasOwnProperty;
let hasOwn = function (obj, key) { return hasOwnProperty.apply(obj, [key]); };

let _OPTS_PASSABLE_WITH_DATA = [
    'delimiter', 'scope', 'context', 'debug', 'compileDebug',
    'client', '_with', 'rmWhitespace', 'strict', 'filename', 'async'
];
let _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat('cache');

function createNullProtoObjWherePossible() {
    if (typeof Object.create == 'function') {
        return function () {
            return Object.create(null);
        };
    }

    if (!({__proto__: null} instanceof Object)) {
        return function () {
            return {__proto__: null};
        };
    }
      
    return function () {
        return {};
    };
}

function shallowCopy(to, from) {
    from = from || {};

    if ((to !== null) && (to !== undefined)) {
        for (let p in from) {
            if (!hasOwn(from, p)) 
                continue;
            
            if (p === '__proto__' || p === 'constructor') 
                continue;
            
            to[p] = from[p];
        }
    }

    return to;
}

function shallowCopyFromList(to, from, list) {
    list = list || [];
    from = from || {};

    if ((to !== null) && (to !== undefined)) {
      for (let i = 0; i < list.length; i++) {
        let p = list[i];

        if (typeof from[p] != 'undefined') {
          if (!hasOwn(from, p)) 
            continue;
          
          if (p === '__proto__' || p === 'constructor') 
            continue;
          
          to[p] = from[p];
        }
      }
    }

    return to;
}

function handleCache(options, template) {
    var func;
    var filename = options.filename;
    var hasTemplate = arguments.length > 1;
  
    if (options.cache) {
      if (!filename) 
        throw new Error('cache option requires a filename');
      
      func = exports.cache.get(filename);

      if (func) 
        return func;
      
      if (!hasTemplate) 
        template = require(filename);
    }
    else if (!hasTemplate) {      
      if (!filename) {
        throw new Error('Internal EJS error: no file name or template '
                      + 'provided');
      }

      template = require(filename);
    }

    func = exports.compile(template, options);

    if (options.cache) 
      exports.cache.set(filename, func);
    
    return func;
}

exports.compile = (template, opts) => {
    try{
        let templ;
  
        if (opts && opts.scope) {
            if (!opts.context) 
                opts.context = opts.scope;
            
            delete opts.scope;
        }

        templ = new Template(template, opts);
        const compiled = templ.compile();

        return compiled;
    }
    catch(e){
        console.error(e);
    }    
};

exports.compiledPage = exports.compile;

exports.render = function (template, d, o) {
    var data = d || createNullProtoObjWherePossible();
    var opts = o || createNullProtoObjWherePossible();
  
    if (arguments.length == 2) 
        shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
      
    return handleCache(opts, template)(data);
};

exports.renderFile = function () {
    try{
        var args = Array.prototype.slice.call(arguments);
        var filename = args.shift();
        var cb: Function;
        var opts: any = { filename: filename };
        var data: any;
        var viewOpts;

        if (typeof arguments[arguments.length - 1] == 'function') 
            cb = args.pop();
        
        if (args.length) {
            data = args.shift();

            if (args.length) {
                shallowCopy(opts, args.pop());
            }
            else{
                if (data.settings) {
                    if (data.settings.views) 
                        opts.views = data.settings.views;
                    
                    if (data.settings['view cache']) 
                        opts.cache = true;
                                    
                    viewOpts = data.settings['view options'];

                    if (viewOpts) 
                        shallowCopy(opts, viewOpts);                
                }

                shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
            }

            opts.filename = filename;
        }
        else {
            data = createNullProtoObjWherePossible();
        }

        fs.readFile(filename, 'utf-8', (err, content) => {
            if (err) 
                return cb(err);
            
            let rendered = content.replace(/\{\{(.+?)\}\}/g, (_, key) => {
                const value = data[key.trim()];
                return value !== undefined ? value : '';
            });

            return cb(null, rendered);
        });
    }   
    catch(e){
        console.error(e);
    }
}

exports.Template = Template;

exports.clearCache = function () {
    exports.cache.reset();
};