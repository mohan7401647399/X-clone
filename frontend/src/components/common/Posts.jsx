import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { BASE_URL } from "../../constant/url";
import { useQuery } from '@tanstack/react-query';
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {
	//	get for you or following Posts
	const getPostEndPoint = () => {
		switch (feedType) {
			case "forYou":
				return `${BASE_URL}/api/posts/getall`
			case "following":
				return `${BASE_URL}/api/posts/following`
			case "posts":
				return `${BASE_URL}/api/posts/user/${username}`
			case "likes":
				return `${BASE_URL}/api/posts/likes/${userId}`
			default:
				return `${BASE_URL}/api/posts/getall`
		}
	}
	const POST_END_POINT = getPostEndPoint()

	//	get posts
	const { data: posts, isLoading, refetch, isRefetching } = useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			try {
				const response = await fetch(POST_END_POINT, {
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const data = await response.json()
				if (!response.ok) throw new Error(data.error || 'something went wrong in get auth user')
				return data

			} catch (error) {
				console.log(`get auth user error message: ${error}`)
				throw error
			}
		}
	})

	useEffect(() => {
		refetch()
	}, [refetch, feedType])

	return (
		<>
			{ (isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			) }
			{ !isLoading && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p> }
			{ !isLoading && posts && (
				<div>
					{ posts.map((post) => (
						<Post key={ post._id } post={ post } />
					)) }
				</div>
			) }
		</>
	);
};
export default Posts;