import { faPlus, faEdit, faTrash, faUser, faUsers, faAddressBook, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth'
import viLocale from '@fullcalendar/core/locales/vi';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './LichDatBan.css'; // Import file CSS

function LichDatBan({setShowAddLichDatBan}) {
    let list = null;

    useEffect(() => {
        list = document.querySelector('.list-detail');
    }, []); // Empty dependency array ensures this effect runs only once (like componentDidMount)

    const handleOpenList = () => {
        if (list) {
            list.style.width = '45em';
            list.style.padding = '40px 20px 0 20px';
        }
    }

    const handleCloseList = () => {
        if (list) {
            list.style.width = '0';
            list.style.padding = '0';
        }
    }

    const dayClickAction = (info) => {
        setShowAddLichDatBan(true, info.dateStr);
    }
    return (
        <div className="container">
            <div className="header">
                <ul className="table-options">
                    <NavLink to='/Ban'>
                        <li>Quản lý bàn</li>
                    </NavLink>
                    <NavLink to='/Ban/LichDatBan'>
                        <li className='open'>Lịch đặt bàn</li>
                    </NavLink>
                    
                </ul>
                <button className="btn-them btn-list" onClick={handleOpenList}>
                    <FontAwesomeIcon icon={faAddressBook} /> Xem chỉ tiết
                </button>
            </div>
            <div className="content content-2">
                <FullCalendar
                    locale={viLocale}
                    plugins={[ dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height='30em'
                    eventBackgroundColor='rgb(195, 0, 0)'
                    dateClick={dayClickAction}
                    events={[
                        { title: 'Sự kiện 1', start: '2024-11-01T12:00:00' },
                        { title: 'Sự kiện 2', start: '2024-11-05' },
                        { title: 'Sự kiện 3', start: '2024-11-07' },
                        { title: 'Sự kiện 4', start: '2024-11-10' },
                        { title: 'Sự kiện 5', start: '2024-11-12' },
                        { title: 'Sự kiện 6', start: '2024-11-15' },
                        { title: 'Sự kiện 7', start: '2024-11-17' },
                        { title: 'Sự kiện 8', start: '2024-11-20' },
                    ]}
                    
                    views={{
                        multiMonth3:{
                            type: 'multiMonth',
                            duration: {months: 3},
                            titleFormat: {months: 'short', years: 'numeric'},
                            columnHeaderFormat: {weekday: 'short'},
                            buttonText: '3 tháng',
                        }
                    }}

                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridDay timeGridWeek dayGridMonth multiMonth3'
                    }}
                />
            </div>
            <div className="list-detail">
                <div className="close-btn" onClick={handleCloseList}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <FullCalendar
                    locale={viLocale}
                    plugins={[listPlugin]}
                    initialView="listWeek"
                    height='35em'
                    eventBackgroundColor='rgb(195, 0, 0)'
                    events={[
                        { title: 'Sự kiện 1', start: '2024-11-01T12:00:00' },
                        { title: 'Sự kiện 2', start: '2024-11-05' },
                        { title: 'Sự kiện 3', start: '2024-11-07' },
                        { title: 'Sự kiện 4', start: '2024-11-10' },
                        { title: 'Sự kiện 5', start: '2024-11-12' },
                        { title: 'Sự kiện 6', start: '2024-11-15' },
                        { title: 'Sự kiện 7', start: '2024-11-17' },
                        { title: 'Sự kiện 8', start: '2024-11-20' },
                    ]}
                    
                    views={{
                        listDay:{
                            type: 'listDay',
                            // titleFormat: {weekday: 'long'},
                            // columnHeaderFormat: {day: 'numeric'},
                            buttonText: 'Ngày',
                        },
                        listWeek:{
                            type: 'listWeek',
                            // titleFormat: {week: 'numeric'},
                            // columnHeaderFormat: {weekday: 'long'},
                            buttonText: 'Tuần',
                        },
                        listMonth:{
                            type: 'listMonth',
                            // titleFormat: {month: 'long'},
                            // columnHeaderFormat: {day: 'numeric'},
                            buttonText: 'Tháng',
                        }
                    }}

                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'listDay listWeek listMonth',
                    }}
                />
            </div>
        </div>
    );
}
export default LichDatBan;