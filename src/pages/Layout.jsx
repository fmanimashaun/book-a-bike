import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppData } from 'app/redux/AppDataSlice';
import Sidebar from 'components/Sidebar';

const Layout = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    dispatch(fetchAppData());
  }, [dispatch]);

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return (
        <div>
          Error:
          {error}
        </div>
      );
    }

    return <Outlet />;
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 bg-gray-100 text-dark-blue p-4 overflow-auto">
        {renderContent()}
      </main>
    </>
  );
};

export default Layout;
