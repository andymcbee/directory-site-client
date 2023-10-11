async function getLocationPageSlugs() {
  const res = await fetch(`http://localhost:3000/api/v1/location-pages`)
  return res.json()
}

export interface BaseLocationPage{
  slug?: string;
  location_id?: string;
  main_keyword?: string;
}

export interface LocationPage extends BaseLocationPage{
  id?: string;
}

export interface BaseLocation {
  is_core_location: boolean;
  name: string;
  area_name: string;
  state: string;
  country: string;
  api_feature_url: string;
  geotype: string;
  latitude: number;
  longitude: number;
  geom: string;
}

export interface Location extends BaseLocation {
  id: string;
}

export interface BaseCompany {
  name: string;
  query: string;
  website: string;
  type: string;
  subtypes: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  photo: string;
  logo: string;
  latitude: number;
  longitude: number;
  geom: string; 
}



export interface Company extends BaseCompany {
  id: string;
}







  // Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {

    const data = await getLocationPageSlugs()

    const pages: BaseLocationPage[] = data.locationPages

    console.log("Data from the generateStaticParams...")
    console.log(pages[0])
  

    return pages.map((page) => ({
      slug: page.slug
    }))
  }


 
   
  export default async function Page({params}) {

    const { slug } = params

    const res = await fetch(`http://localhost:3000/api/v1/location-pages/${slug}`)

    const data = await res.json()

    const location: Location = data.data.location
    const locationPage: LocationPage = data.data.locationPage

    console.log("Loc data::")
    console.log(location)


    //Companies

    const companiesArray = await fetch(`http://localhost:3000/api/v1/locations/${location.id}/companies/3`)

    const companiesArrayData = await companiesArray.json()

    const companies: Company[] = companiesArrayData.data.companies

    console.log("COMPANIES~~~~~~~~~~~~~~~")
    console.log(companies)
    console.log("COMPANIES~~~~~~~~~~~~~~~")
    return(
      <>
        <ul>
          <li>Page slug: {params.slug}</li>
          <li>Location name: {location.name}</li>
          <li>Page keyword: {locationPage.main_keyword}</li>
        </ul>
        {companies.map((item, index) => (
          <div key={index}>
            <h2>Title: {item.name}</h2>
          </div>
        ))}
      </>
      
    ) 
    

  }


/*   {items.map((item, index) => (
    <div key={index}>
      <h2>Title: {item}</h2>
    </div>
  ))} */