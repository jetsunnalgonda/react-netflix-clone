import axios from "axios";
import React, {useCallback, useEffect, useMemo} from "react";
import { useState } from "react";

import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    movieID: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieID}) => {
    const {mutate: mutateFavorites} = useFavorites()
    const {data: currentUser, mutate} = useCurrentUser()

    // console.log(`current user is ${currentUser?.name}`)
    // let isFavorite = currentUser?.favoriteIDs?.includes(movieID)

    // const [isFavorite, setIsFavorite] = useState(false)
    const [isFavoriteNow, setIsFavoriteNow] = useState(true)
    // const [favoriteIcon, setFavoriteIcon] = useState(AiOutlinePlus)

    const isFavorite = useMemo(() => {
        console.log('isFavorite useMemo hook')
        console.log(`currentUser is ${currentUser}`)
        const list = currentUser?.favoriteIDs || []

        return list.includes(movieID)
    }, [currentUser, movieID])

    console.log(`isFavorite value: `, isFavorite)

    // useMemo(() => {
    //     const list = currentUser?.favoriteIDs || []
    //     setIsFavorite(list.includes(movieID))
    // }, [currentUser, movieID])

    // const toggleFavorites = useCallback(async () => {
    //     console.log('toggleFavorites')
    //     console.log(`isFavorite: ${isFavorite}`)
    //     let response

    //     if (isFavorite) {
    //         response = await axios.delete('/api/favorite', {data: {movieID}})
    //     } else {
    //         response = await axios.post('/api/favorite', {movieID})
    //     }

    //     const updatedFavoriteIDs = response?.data?.favoriteIDs

    //     mutate ({
    //         ...currentUser,
    //         favoriteIDs: updatedFavoriteIDs
    //     }, false)

    //     mutateFavorites()

    //     // Update isFavorite based on the updated currentUser object
    //     // const updatedCurrentUser = { ...currentUser, favoriteIDs: updatedFavoriteIDs };
    //     // const list = updatedCurrentUser?.favoriteIDs || [];
    //     // setIsFavorite(list.includes(movieID));

    //     isFavorite = !isFavorite // Update the value of isFavorite after the mutation


    // }, [movieID, isFavorite, currentUser, mutate, mutateFavorites])

    const toggleFavorites = useCallback(async () => {
        let response;
      
        if (isFavorite) {
          response = await axios.delete('/api/favorite', {data: {movieID}})
        } else {
          response = await axios.post('/api/favorite', {movieID})
        }
      
        const updatedFavoriteIDs = response?.data?.favoriteIDs
      
        mutate({
          ...currentUser,
          favoriteIDs: updatedFavoriteIDs
        }, false)
      
        mutateFavorites()
      
        console.log("isFavorite after toggle: ", !isFavorite)
        setIsFavoriteNow(isFavorite)
    }, [movieID, isFavorite, currentUser, mutate, mutateFavorites])
      
    console.log("isFavorite value: ", isFavorite);

    // useEffect(() => {
    //     console.log('isFavorite in useEffect:', isFavorite);
    //     setFavoriteIcon(isFavorite ? 'heart' : 'heart-outline');
    //   }, [isFavorite]);


    const Icon = isFavoriteNow ? AiOutlineCheck : AiOutlinePlus

    console.log(isFavorite)

    return(
        <div onClick={toggleFavorites}
        className="
            cursor-pointer
            group/item
            w-6
            h-6
            lg:w-10
            lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:border-neutral-300
        ">
            {/* <span className="text-white">hey {isFavoriteNow}</span> */}
            <Icon className="text-white" size={25}/>
        </div>
    )
}

export default FavoriteButton
