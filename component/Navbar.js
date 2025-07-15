import React from 'react';
import { ImProfile } from "react-icons/im";
import { MdEventAvailable, MdImage, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiListSettingsLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { BsCake2 } from "react-icons/bs";
import Link from 'next/link';
import { useRouter } from "next/router";
import { BsCashCoin } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
const Navbar = (props) => {
    const router = useRouter();
    
    return (
        <>
            {props.loading ? (  // Check if loading prop is true
               <div className='loader'> <span className="loader2"></span> </div>
            ) : (
                <nav className={props.expand ? 'm-navbar expand' : 'm-navbar unexpand'}>
                    <ul>
                        {/*  Event */}
                        <li>
                            <Link href="/admin/event/addEvent">
                                <span className="icons"><MdEventAvailable /></span>
                                <span className="linklabel">Event</span>
                                <span className="submenuIcon"><MdOutlineKeyboardArrowDown /></span>
                            </Link>
                            <ul>
                                <li><Link href="/admin/event/create-event">Add Event</Link></li>
                                <li><Link href="/admin/event/manageEvent">Manage Event</Link></li>
                            </ul>
                        </li>
                            <li>
                            <Link href="/AllBirthday">
                                <span className="icons"><BsCake2/></span>
                                <span className="linklabel">Birthdays</span>
                                <span className="submenuIcon"><BsCake2/></span>
                            </Link>
                            <ul>
                                <li><Link href="/SendBirthday">Send Canva</Link></li>
                                <li><Link href="/AddBirthday">Add Canva</Link></li>
                            </ul>
                        </li>
                            <li>
                            <Link href="/admin/event/addEvent">
                                <span className="icons"><GrGroup /></span>
                                <span className="linklabel">Conclave</span>
                                <span className="submenuIcon"><MdOutlineKeyboardArrowDown /></span>
                            </Link>
                            <ul>
                                <li><Link href="/admin/event/createconclave">Add Conclave</Link></li>
                                <li><Link href="/admin/event/manageconclave">Manage Conclave</Link></li>
                            </ul>
                        </li>
                         <li>
                            <Link href="/admin/profile">
                                <span className="icons"><ImProfile /></span>
                                <span className="linklabel">Profiling</span>
                            </Link>
                        </li>
                          {/* <li>
                            <Link href="/admin/event/cpmembers">
                                <span className="icons"><FaRegUser /></span>
                                <span className="linklabel">Add Orbiters</span>
                                <span className="submenuIcon"><MdOutlineKeyboardArrowDown /></span>
                            </Link>
                           
                        </li> */}
                        <li>
                            <Link href="/admin/event/userlist">
                                <span className="icons"><FaRegUser /></span>
                                <span className="linklabel">Users</span>
                                <span className="submenuIcon"><MdOutlineKeyboardArrowDown /></span>
                            </Link>
                            <ul>
                                <li><Link href="/admin/event/userlist">Users Listing</Link></li>
                            </ul>
                        </li>
                       
                                     <li>
                            <Link href="">
                                <span className="icons"><BsCashCoin /></span>
                                <span className="linklabel">CP</span>
                            </Link>
                
                        <ul>
                                <li><Link href="/admin/CPAdd">Add CP </Link></li>
                                <li><Link href="/admin/CPList">Manage CP</Link></li>
                            </ul>
                            </li>
                        
                        <li>
                            <Link href="/admin/event/upload">
                                <span className="icons"><RiListSettingsLine /></span>
                                <span className="linklabel">Upload Excel</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}

export default Navbar;
