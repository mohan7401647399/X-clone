import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from "../../constant/url";

const NotificationPage = () => {

	const queryClient = useQueryClient()

	// get notifications hook
	const {data: notifications, isLoading} = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/notifications`, {
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
		},
	})
	//	delete all notifications hook
	const {mutate: deleteAllNotifications} = useMutation({
		mutationFn: async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/notifications`, {
					method: 'DELETE',
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
		},
		onSuccess: () => { 
			toast.success("All notifications deleted")
			queryClient.invalidateQueries({queryKey: ['notifications']})
		},
		onError: (error) => {
			toast.error(error.message)
		}
	})

	//	delete all notifications handler
	const deleteNotifications = () => {
		deleteAllNotifications()
	};

	return (
		<>
			<div className='flex-[4_4_0] border-l border-r border-gray-700 min-h-screen'>
				<div className='flex justify-between items-center p-4 border-b border-gray-700'>
					<p className='font-bold'>Notifications</p>
					<div className='dropdown '>
						<div tabIndex={0} role='button' className='m-1'>
							<IoSettingsOutline className='w-4' />
						</div>
						<ul
							tabIndex={0}
							className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
						>
							<li>
								<a onClick={deleteNotifications} className='cursor-pointer'>Delete all notifications</a>
							</li>
						</ul>
					</div>
				</div>
				{isLoading && (
					<div className='flex justify-center h-full items-center'>
						<LoadingSpinner size='lg' />
					</div>
				)}
				{notifications?.length === 0 && <div className='text-center p-4 font-bold'>No notifications 🤔</div>}
				{notifications?.map((notification) => (
					<div className='border-b border-gray-700' key={notification._id}>
						<div className='flex gap-2 p-4'>
							{notification.type === "follow" && <FaUser className='w-7 h-7 text-primary' />}
							{notification.type === "like" && <FaHeart className='w-7 h-7 text-red-500' />}
							<Link to={`/profile/${notification.from.username}`}>
								<div className='avatar'>
									<div className='w-8 rounded-full'>
										<img alt={notification.from.username} src={notification.from.profileImage || "/avatar-placeholder.png"} />
									</div>
								</div>
								<div className='flex gap-1'>
									<span className='font-bold'>@{notification.from.username}</span>{" "}
									{notification.type === "follow" ? "followed you" : "liked your post"}
								</div>
							</Link>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
export default NotificationPage;