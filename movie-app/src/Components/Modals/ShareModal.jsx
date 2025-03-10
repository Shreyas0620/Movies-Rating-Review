import React from 'react';
import MainModal from './MainModal';
import { FaFacebook, FaTelegram, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';

function ShareMovieModal({ modalOpen, setModalOpen, movie }) {
    const shareData = [
        {
            icon: FaFacebook,
            shareButton: FacebookShareButton,
        },
        {
            icon: FaTwitter,
            shareButton: TwitterShareButton,
        },
        {
            icon: FaTelegram,
            shareButton: TelegramShareButton,
        },
        {
            icon: FaWhatsapp,
            shareButton: WhatsappShareButton,
        },
        {
            icon: FaEnvelope,
            shareButton: EmailShareButton,
        },
    ];

    const url = `${window.location.protocol}//${window.location.host}/movie/${movie._id}`;

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
                <h2 className='text-2xl text-white text-center'>Share <span className='text-xl font-bold'> "{movie?.name}" </span></h2>
                <div className='flex justify-center mt-6'>
                    <div className='flex flex-row gap-6'>
                        {shareData.map((data, index) => (
                            <data.shareButton key={index} url={url} quote="Soul Movie | Rate Review Site">
                                <div className='w-12 transitons hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30'>
                                    <data.icon />
                                </div>
                            </data.shareButton>
                        ))}
                    </div>
                </div>
            </div>
        </MainModal>
    );
}

export default ShareMovieModal;