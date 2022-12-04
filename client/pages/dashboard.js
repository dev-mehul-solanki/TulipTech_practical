import React, { Suspense } from "react";
import { fetchUserData } from "../selectors/name";
import { useRecoilValue } from "recoil";
import Image from 'next/image'
import withAuth from '../helper/withAuth'

const DashBoard = () =>{
    function CurrentUserInfo() {
        const userData = useRecoilValue(fetchUserData);
        const {data} = userData;
        
        return (
            <div style={{display:'flex', overflowX:'auto'}}>
                {data.photos.map((item) => (
                    <div key={item.id} style={{marginLeft:'5px'}}>
                    <div>
                        {item.earth_date}
                    </div>
                        <Image alt="Picture of the author" src={`${item.img_src}`} width={500} height={500}/>
                    </div>
                ))}
                </div>
        );
      }
    return (
        
            <Suspense fallback={<div>Loading...</div>}>
                <CurrentUserInfo/>
            </Suspense>
        
    );
}
    
export default withAuth(DashBoard);