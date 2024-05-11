import ReactMarkdown from 'react-markdown';


export const defaultComponents = {
    h1: (props:any) => (
      <h1 {...props} className='dark:text-gray-200'>
        {props.children}
      </h1>
    ),
    h2: (props:any) => (
      <h2 {...props} className='dark:text-gray-200'>
        {props.children}
      </h2>
    ),
    h3: (props:any) => (
      <h3 {...props} className='dark:text-gray-200'>
        {props.children}
      </h3>
    ),
    strong: (props:any) => (
      <strong {...props} className='dark:text-gray-200'>
        {props.children}
      </strong>
    ),
    p: (props:any) => (
      <p {...props} className='dark:text-gray-400' >
        {props.children}
      </p>
    ),
    li: (props:any) => (
      <p {...props} className='dark:text-gray-400' >
        {props.children}
      </p>
    )
}

type Props = {
  mdxSource: string,
  components?: any
}
 
export function ClientMdxPage({ mdxSource,components }:Props) {
 
  return (
    <ReactMarkdown components={{ ...defaultComponents, ...(components || {}) }} >
      {mdxSource}
    </ReactMarkdown>
  )
}



