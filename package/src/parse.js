const NEWLINES_MATCH = /\r\n|\n|\r/
    const NEWLINE = '\n'
    const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
    const RE_NEWLINES = /\\n/g

    const parseBuffer = (src) => {
      const obj = {};
      src.toString().split(NEWLINES_MATCH).forEach((line, idx) => {
        // matching "KEY" and "VAL" in "KEY=VAL"
        const keyValueArr = line.match(RE_INI_KEY_VAL);
        // matched?
        if(keyValueArr != null){
          const key = keyValueArr[1];

          // default undefined or missing values to empty string

          let val = (keyValueArr[2] || '');
          const end = val.length -1;
          const isDoubleQuoted = val[0] === '"' && val[end] === '"';
          const isSingleQuoted = val[0] === "'" && val[end] === "'";

          // if single or double quoted, remove quotes 
          if(isSingleQuoted || isDoubleQuoted) {
            val = val.substring(1, end);

            // if double quoted, expand newlines
            if(isDoubleQuoted){
              val = val.replace(RE_NEWLINES, NEWLINE);
            }        
          } else {
            //  remove surrounding whitespace
            val = val.trim();
          }
          obj[key] = val;
        }
      });
      return obj;
    }

    module.exports = {
      parseBuffer
    }