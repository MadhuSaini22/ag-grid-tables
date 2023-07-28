declare global {
  interface Window {
    CSSPlugin: any;
  }
}

if (typeof window !== "undefined") {
  const waitSeconds = 100;
  const head = document.getElementsByTagName("head")[0];
  const isWebkit = !!window.navigator.userAgent.match(/AppleWebKit\/([^ ;]*)/);

  const webkitLoadCheck = (link: HTMLLinkElement, callback: () => void) => {
    setTimeout(() => {
      for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = document.styleSheets[i] as CSSStyleSheet;
        if (sheet.href === link.href) {
          return callback();
        }
      }
      webkitLoadCheck(link, callback);
    }, 10);
  };

  const cssIsReloadable = (links: HTMLLinkElement[]) => {
    let reloadable = true;
    links.forEach((link) => {
      if (!link.hasAttribute("data-systemjs-css")) {
        reloadable = false;
        link.setAttribute("data-systemjs-css", "");
      }
    });
    return reloadable;
  };

  const findExistingCSS = (url: string) => {
    const links = head.getElementsByTagName("link") as HTMLLinkElement[];
    return links.filter((link) => link.href === url);
  };

  const noop = () => {};

  const loadCSS = (url: string, existingLinks: HTMLLinkElement[]) => {
    const stylesUrl = url.includes("styles.css") || url.includes("style.css");
    return new Promise<void>((outerResolve, outerReject) => {
      setTimeout(
        () => {
          new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject("Unable to load CSS");
            }, waitSeconds * 1000);

            const link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            link.setAttribute("data-systemjs-css", "");

            if (!isWebkit) {
              link.onload = () => {
                clearTimeout(timeout);
                resolve();
              };
            } else {
              webkitLoadCheck(link, () => {
                clearTimeout(timeout);
                resolve();
              });
            }

            link.onerror = (event) => {
              clearTimeout(timeout);
              reject(event.error || new Error("Error loading CSS file."));
            };

            if (existingLinks.length) head.insertBefore(link, existingLinks[0]);
            else head.appendChild(link);
          })
            .then((result) => {
              existingLinks.forEach((link) => link.parentElement?.removeChild(link));
              return result;
            })
            .catch((err) => {
              existingLinks.forEach((link) => link.parentElement?.removeChild(link));
              throw err;
            })
            .then(() => {
              stylesUrl ? outerResolve() : setTimeout(() => outerResolve(), 5);
            })
            .catch((error) => {
              outerReject(error);
            });
        },
        stylesUrl ? 5 : 0
      );
    });
  };

  exports.fetch = function (load: any) {
    const links = findExistingCSS(load.address);
    if (!cssIsReloadable(links)) return "";
    return loadCSS(load.address, links);
  };
} else {
  let builderPromise: Promise<any>;

  function getBuilder(loader: any): Promise<any> {
    if (builderPromise) return builderPromise;

    return (builderPromise = System["import"]("./css-plugin-base.js", module.id).then((CSSPluginBase) => {
      return new CSSPluginBase((source: string, address: string) => {
        return {
          css: source,
          map: null,
          moduleSource: null,
          moduleFormat: null,
        };
      });
    }));
  }

  exports.cssPlugin = true;
  exports.fetch = function (load: any, fetch: any) {
    if (!this.builder) return "";
    return fetch(load);
  };
  exports.translate = function (load: any, opts: any) {
    if (!this.builder) return "";
    const loader = this;
    return getBuilder(loader).then((builder) => {
      return builder.translate.call(loader, load, opts);
    });
  };
  exports.instantiate = function (load: any, opts: any) {
    if (!this.builder) return;
    const loader = this;
    return getBuilder(loader).then((builder) => {
      return builder.instantiate.call(loader, load, opts);
    });
  };
  exports.bundle = function (loads: any, compileOpts: any, outputOpts: any) {
    const loader = this;
    return getBuilder(loader).then((builder) => {
      return builder.bundle.call(loader, loads, compileOpts, outputOpts);
    });
  };
  exports.listAssets = function (loads: any, opts: any) {
    const loader = this;
    return getBuilder(loader).then((builder) => {
      return builder.listAssets.call(loader, loads, opts);
    });
  };
}

// Because IE8?
function filter(arrayLike: ArrayLike<any>, func: (item: any) => boolean) {
  const arr: any[] = [];
  forEach(arrayLike, (item) => {
    if (func(item)) arr.push(item);
  });
  return arr;
}

// Because IE8?
function forEach(arrayLike: ArrayLike<any>, func: (item: any) => void) {
  for (let i = 0; i < arrayLike.length; i++) {
    func(arrayLike[i]);
  }
}
