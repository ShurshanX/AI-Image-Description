import { MDXRemote } from 'next-mdx-remote/rsc'


const defaultComponents = {
  // h1: (props:any) => (
  //   <h1 {...props} className='dark:text-gray-200'>
  //     {props.children}
  //   </h1>
  // ),
  // h2: (props:any) => (
  //   <h2 {...props} className='dark:text-gray-200'>
  //     {props.children}
  //   </h2>
  // ),
  // h3: (props:any) => (
  //   <h3 {...props} className='dark:text-gray-200'>
  //     {props.children}
  //   </h3>
  // ),
  // strong: (props:any) => (
  //   <strong {...props} className='dark:text-gray-200'>
  //     {props.children}
  //   </strong>
  // ),
}

type Props = {
  mdxSource: string,
  components?: any
}
 
export function RemoteMdxPage({ mdxSource,components }:Props) {
 
  return (
    <div className={`prose max-w-none dark:text-gray-400 dark:prose-h1:text-gray-200 dark:prose-h2:text-gray-200 dark:prose-h3:text-gray-200 dark:prose-strong:text-gray-200`}>
      <MDXRemote source={mdxSource} components={{ ...defaultComponents, ...(components || {}) }}/>
    </div>
  )
}



