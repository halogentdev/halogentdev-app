// stub declarations to satisfy TypeScript when dependencies are not installed

declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useContext: any;
  export const useRef: any;
  export type FC<P = {}> = any;
  export const createElement: any;
  export namespace JSX {
    interface Element {}
    interface IntrinsicElements { [elem: string]: any; }
  }
  const React: any;
  export default React;
}
declare module 'react-dom' {
  const ReactDOM: any;
  export default ReactDOM;
}
declare module 'wouter' {
  export function Link(props: any): any;
  export function Route(props: any): any;
  export function Router(props: any): any;
  export function Switch(props: any): any;
  export function useLocation(): [string, (loc: string) => void];
  export function useRoute(pattern: string): any;
}
declare module '@privy-io/react-auth' {
  export function useAuth(): any;
}
declare module 'zod' {
  export const z: any;
  export namespace z {
    // allow z.infer in type positions
    export type infer<T> = any;
  }
}
declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export function jsxDEV(type: any, props: any, key?: any): any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
