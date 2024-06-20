
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import RefreshLoader from '../utility/Loaders/RefreshLoader';
import { Navigate } from 'react-router-dom';

const EmplayeeRoute = ({children}) => {
    const { user , loading} = useAuth();
    const [role] = useAdmin();

    if (loading) {
      return <RefreshLoader />
    }

    if (user && role === 'employee') {
      return children;
    }
    else{
      return <Navigate to={'/'} />
    }

}

export default EmplayeeRoute