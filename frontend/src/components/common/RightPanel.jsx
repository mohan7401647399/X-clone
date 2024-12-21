import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton.jsx";
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from "../../constant/url.js";
import useFollow from "../../hooks/useFollow.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

const RightPanel = () => {

	const { data: suggestedUsers, isLoading } = useQuery({
		queryKey: ["suggestedUsers"],
		queryFn: async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/users/suggested`, {
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

	const { follow, isPending } = useFollow()

	if (suggestedUsers?.length === 0) return <div className="md:w-64 w-0"></div>

	return (
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					{/* item */ }
					{ isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					) }
					{ !isLoading &&
						suggestedUsers?.map((user) => (
							<Link
								to={ `/profile/${user.username}` }
								className='flex items-center justify-between gap-4'
								key={ user._id }
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img alt={ user.fullName } src={ user.profileImage || "/avatar-placeholder.png" } />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{ user.fullName }
										</span>
										<span className='text-sm text-slate-500'>@{ user.username }</span>
									</div>
								</div>
								<div>
									<button
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
										onClick={ (e) => {
											e.preventDefault()
											follow(user._id)
										} }
									>
										{ isPending ? <LoadingSpinner size="sm" /> : "Follow" }
									</button>
								</div>
							</Link>
						)) }
				</div>
			</div>
		</div>
	);
};
export default RightPanel;