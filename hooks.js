const React = (function () {
  let hooks = [];
  let idx = 0;

  const useState = (initalState) => {
    const _idx = idx;
    const state = hooks[_idx] || initalState;

    const setState = (newVal) => {
      hooks[_idx] = newVal;
    };

    idx += 1;

    return [state, setState];
  };

  const useEffect = (cb, depArray) => {
    const oldDeps = hooks[idx];
    let hasChanged = true;
    if (oldDeps) {
      hasChanged = depArray.some((dep, idx) => !Object.is(dep, oldDeps[idx]));
    }

    if (hasChanged) cb();
    hooks[idx] = depArray;
    idx += 1;
  };

  const render = (Component) => {
    idx = 0;
    const C = Component();
    C.render();
    return C;
  };

  return { render, useState, useEffect };
})();

function Component() {
  const [val, setVal] = React.useState(1);
  const [text, setText] = React.useState('text');

  React.useEffect(() => {
    console.log('Component is rendered');
  }, [text]);

  return {
    render: () => console.log({ val, text }),
    click: () => setVal(val + 1),
    text: (newText) => setText(newText),
  };
}

let App = React.render(Component);
App.click();
App = React.render(Component);
App.text('apple');
App = React.render(Component);
