/**
 *  A basic logger wrapper for the browser's console
 *  
 *  Usage example: 
 *      const logger = getLogger({ module: "Utils" });
 *      logger.warn("")
 * 
 * 
 *  // TODO: filter the debug calls on dev env
 */
export const getLogger = ({ module }) => {

    const projectName = "[D3 Funnel Graph]";
    const _style = "background: #007acc; color: white; padding: 2px 4px; border-radius: 3px";
    const getColorStyle = (method) => {
        switch (method) {
            case "warn":
                return `color: orange;`;
            case "error":
                return `color: red;`;
            case "debug":
                return `color: green;`;
        }

        return `color: #000000;`;
    };
    
    const _prefix = `${projectName} ${module || ""}`;
    const _formatMessage = (message) => `%c${_prefix}%c %c${message}`;
    const _wrapConsoleMethod = (method) => (...args) => console[method].apply(console, [_formatMessage(args[0]), _style, "", getColorStyle(method), ...args.slice(1)]);

    const log = _wrapConsoleMethod("log");
    const info = _wrapConsoleMethod("info");
    const warn = _wrapConsoleMethod("warn");
    const error = _wrapConsoleMethod("error");
    const debug = _wrapConsoleMethod("debug");

    return {
      log,
      info,
      warn,
      error,
      debug
    };
};