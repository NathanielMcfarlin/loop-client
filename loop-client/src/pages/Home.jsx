import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPlatform } from "../services/platformService"
import { useNavigate } from "react-router-dom";

export const Home = ({ setToken, token }) => {
  const [platform, setPlatform] = useState([]);
  const navigate = useNavigate();

  const getAndSetPlatforms = () => {
    getPlatform().then((platformArray) => {
      setPlatform(platformArray)
    })
  }

  useEffect(() => {
    getAndSetPlatforms();
  }, [])


  return (
    <div className="platform-cards-container">
      <h1 className='welcome-message'>Welcome to In The Loop</h1>
      <div className="platform-container">CHOOSE YOUR PLATFORM</div>
      {platform && platform.length ? (
        <div>
          {platform.map((plat) => (
            <div className="platform-card" key={plat.id} onClick={() => navigate(`/platforms/${plat.id}`)}>
              <Link to={`/platforms/${plat.id}`}>
                <div className="platform-image-container">
                  <img src={plat.platform_image} alt={plat.platform} className="" />
                </div>
                <h3>{plat.platform_name}</h3>
                {/* Add other details you want to display */}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No platforms available</p>
      )}
    </div>
  );
}

