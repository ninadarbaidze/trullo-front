import { getCookie, setCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyBoard, verifyUser } from 'services';

export const useAuth = () => {
  const [errorExists, setErrorExists] = useState(false);
  const params = useSearchParams();
  const [modalTexts, setModalTexts] = useState({
    modalTitle: '',
    btnText: '',
    btnTextError: '',
    btnUrl: '',
    btnUrlError: '',
  });

  const verifyAccount = async () => {
    try {
      setModalTexts({
        modalTitle: 'YOUR ACCOUNT IS VERIFIED',
        btnText: 'Go to boards',
        btnTextError: 'Back to sign up',
        btnUrl: '/boards',
        btnUrlError: '/user/signup',
      });

      await verifyUser(params.get('verify-account') as string);
      setErrorExists(false);
    } catch (err: any) {
      setErrorExists(true);
    }
  };

  const acceptInvitation = async () => {
    const user = !!getCookie('user') && JSON.parse(getCookie('user') as string);

    try {
      const response = await verifyBoard(
        getCookie('token') as string,
        user.id!,
        params.get('accept-invitation') as string
      );
      setCookie('board', response.boardName);
      setModalTexts({
        modalTitle: `Welcome to our ${response.boardName} board`,
        btnText: 'Go to board',
        btnTextError: `Back to your ${response.boardName}`,
        btnUrl: `/boards/${response.boardId}`,
        btnUrlError: '/boards',
      });
      setErrorExists(false);
    } catch (err: any) {
      setErrorExists(true);
    }
  };

  useEffect(() => {
    params.get('verify-account') && verifyAccount();
    params.get('accept-invitation') && acceptInvitation();
  }, []);

  return { errorExists, modalTexts };
};
