import useFetch from "../../hooks/useFetch";
import "./featured.scss";

function Featured() {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=marid,london,DN"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://i.pinimg.com/564x/92/9a/19/929a197cdc630fba26c8c37815d7cbda.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Dublin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://i.pinimg.com/564x/f8/91/eb/f891eb943ac5b68ffdc183f6754b06f5.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Deno</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://i.pinimg.com/564x/d5/47/2d/d5472d1306f63eaa0331bcee67968245.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Interlaken</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Featured;
