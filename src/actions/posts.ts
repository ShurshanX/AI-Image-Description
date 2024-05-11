'use server';
import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface Post {
    slug: string,
    frontMatter:FrontMatter,
    content:string,
}

export interface FrontMatter{
    title: string,
    author: string,
    avatar: string,
    twitter: string,
    description:string,
    date:string,
    thumbnail:string,
    tags:string[]
}

export async function getAllPostList(lang:string="en"){
    if(!lang){
        lang = "en";
    }
  
    const root = process.cwd();
    let files = fs.readdirSync(path.join(root, 'public',"posts",lang)); // get the files
    files = files.filter(file => file.split('.')[1] == "mdx"); // filter only the mdx files
    const posts = files.map(file => { // for each file extract the front matter and the slug
        const fileData = fs.readFileSync(path.join(root, 'public',"posts",lang,file),'utf-8');
        const {data} = matter(fileData);
       return {
            frontMatter:data as FrontMatter,
            slug:file.split('.')[0]
        } as Post
    });
    return posts;
}

export async function getPost(slug:string,lang:string="en"){

    if(!lang){
        lang = "en";
    }
    const root = process.cwd();
    let fileData = fs.readFileSync(path.join(root,'public',"posts",lang,`${slug}.mdx`)); // get the files
    const {data,content} = matter(fileData);
    const Post = {
        frontMatter:data as FrontMatter,
        content:content
    }
    return Post;
}


export async function getSerializePost(slug:string):Promise<MDXRemoteSerializeResult>{

    const root = process.cwd();
    let fileData = fs.readFileSync(path.join(root,'public',"posts",`${slug}.mdx`)); // get the files
    const {content} = matter(fileData);
    const mdxSource = await serialize(content);
    return mdxSource;

}