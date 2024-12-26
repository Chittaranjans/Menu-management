import Image from "next/image";
import type { AppProps } from 'next/app'
import Layout from './layout'
import MenuDetail from './blocks/MenuDetail'

export default function Home() {
  return (
      <div>
        <MenuDetail />
      {/* <div className="text-black">Welcome to the Dashboard</div> */}
  </div>
  );
}
