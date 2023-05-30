import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyUser } from 'services';

export const useAuth = () => {
  const [errorExists, setErrorExists] = useState(false);
  const params = useSearchParams();

  const verifyAccount = async () => {
    try {
      await verifyUser(params.get('verify-account') as string);
      setErrorExists(false);
    } catch (err: any) {
      setErrorExists(true);
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return { errorExists };
};
