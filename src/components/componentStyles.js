import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Button = styled.button.attrs({
    className:
        'btn-auth rounded-full hover:bg-green-300 hover:text-white focus:outline-none',
})``;

export const Background = styled.div.attrs({
    className:
        'w-screen h-screen bg-transparent fixed flex justify-center items-center',
})``;

export const ModalWrapper = styled.div.attrs({
    className:
        'shadow-md bg-snow text-jet grid grid-cols-2 relative z-10 rounded-md',
})`
    width: 800px;
    height: 500px;
`;

export const ModalContent = styled.div.attrs({
    className:
        'flex flex-col justify-center items-center leading-normal text-black',
})`
    & {
        button {
            ${tw`rounded-full p-1 mt-4 text-lg font-josefin font-bold tracking-wider transition ease-out duration-300 border-jet border-2 hover:bg-green-300 hover:text-white focus:outline-none`}
        }
        h1,
        p1 {
            ${tw`text-lg font-josefin font-bold mt-6`}
        }
        select {
            ${tw`text-base rounded-md p-2 font-josefin w-full`}
        }

        option {
            ${tw`text-sm`}
        }
    }
`;
export const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;
