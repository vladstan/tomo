// import {Singleton, Global, Transient} from 'constitute';

export function dependencies(...depPaths) {
  const deps = [];

  for (const depPath of depPaths) {
    let dep = require(depPath);
    dep = dep.default || dep;
    // if (depPath.startsWith('+')) {
    //   deps.push(Transient.with([dep]));
    // } else if (depPath.startsWith('%')) {
    //   deps.push(Global.with([dep]));
    // } else {
    //   deps.push(Singleton.with([dep]));
    // }
    deps.push(dep);
  }

  return function(Class) {
    Class.constitute = function() {
      return deps;
    };
  };
}
