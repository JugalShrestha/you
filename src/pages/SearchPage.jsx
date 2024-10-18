import { YouCard } from '../components';
import { useNavigate, useLocation } from 'react-router-dom';
import GoBackBtnUserPage from '../components/GoBackBtnUserPage';
import { useAppContext } from '../../useAppContext';

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const searchResult = search.get("query") || "";
  const {data} = useAppContext();

  const handleClick = (item) => {
    console.log(item);
    navigate(`/detail/${item.id}`, { state: { item } });
  };

  const filteredData = data.filter((user)=>
    user.name.toLowerCase().includes(searchResult)
  )

  return (
    <>
    {
      searchResult ? 
      <>
        <GoBackBtnUserPage/>
        <div className="search-page">
          {
            filteredData.length >0 ?
            filteredData.map((item) => (
                <YouCard 
                  onClick={() => handleClick(item)} 
                  key={item.id}
                  rank={item.rank} 
                  name={item.name} 
                  photo={item.profileImage}
                />
            ))
            :
            `no ${searchResult} found!`
        }
        </div>
      </> 
      :
      <>
        <div className="search-page">
          {data.map((item) => (
            <YouCard 
              onClick={() => handleClick(item)} 
              key={item.id}
              rank={item.rank} 
              name={item.name} 
              profileImage={item.profileImage}
            />
          ))}
        </div>
    </>
    }
    </>
  );
};

export default SearchPage;
