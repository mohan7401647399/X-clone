import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BASE_URL } from '../constant/url'
import { toast } from 'react-hot-toast';

const useFollow = () => {
    const queryClient = useQueryClient()
    const { mutate: follow, isPending } = useMutation({
        mutationFn: async (userId) => {
            try {
                const response = await fetch(`${BASE_URL}/api/users/follow/${userId}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                if (!response.ok) throw new Error(data.error || 'something went wrong in follow')

                return data
            } catch (error) {
                console.log(`follow error message: ${error}`)
                throw error
            }
        },
        onSuccess: () => {
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] }),
                queryClient.invalidateQueries({ queryKey: ['authUser'] })
            ])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {follow, isPending}
}

export default useFollow
