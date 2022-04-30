# List of Fallacy

This web page was built for nothing, just for learning [nuxt 3](https://v3.nuxtjs.org) and Vue 3.

## Features I used

### `Auto import`

The Directory-based auto-imports is just magic. The nuxt backend server will automatically detect the `useXXX` hooks defined in `composables`, and all Vue SFCs in `components` will be exported with directory prefix, it is so smart, saved a lot of boilerplate code, and can make the project more well structured!

### `V-Slot`

I use it as a replacement of `renderFunctions` in React, but the v-slot in Vue seems to be more powerful and simple.

With v-slot, I don't have to think about the performance issue, (in React, the render function in props may cause the children components render more times than expected)

And also, `v-slot` has all the features render function has. eg. parameters with `v-slot="params"`

### `Fallthrough Attrs`

This is especially useful when you want to use tailwindcss/windicss in your project.

In React world, I have to merge the outer className and inner className, for example `className={classNames(props.className, xxx)}`, but in Vue, everything will just work as I expected. Although sometimes it may be hard to debug.

### Build-in Transition

All the build-in components in Vue are so useful and reliable, I think I don't need to install any other third party library to write a personal project with Vue + Tailwind.

### Components that won't render hundreds of times

Since the setup function only renders once, I can define anything in the setup function without worrying about the performance.

functions are just functions, you don't have to wrap it in useMemo or useCallback

Instance that only need to be created once, can also be put in the setup function. In React, you have to write `const [instance] = useState(() => {...})` or with `useRef`

## Things in my opinion can improve

### Better TypeScript support

I admit that typescript in Vue world is already pretty good, but I still have some problems with it.

- The ts intellisense is not working well when I have not saved the file.
- `v-slot` has a lack of type checking (maybe I am using it in the wrong way).

### Sometimes too magic?

Vue provides so many ways for a developer to write the cleanest code, compared to React16.8+. In React, everything is based on `useState` `useRef` `useMemo` + pureFunction.

For beginners, I think simpler is better, I wish there would be a doc `Vue: the core part`, (maybe it already existed).

## Dev

```bash
# yarn
yarn install
yarn dev
```
