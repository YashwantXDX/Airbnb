import prisma from "@/app/libs/prismadb";
interface IParams{
    listingId?:string;

}
export default async function getListingbyId(
    params:IParams) {
    try{
        const resolvedParams = await params;
        const { listingId } = resolvedParams;
        // const {listingId} = params;
        const listing= await prisma.listing.findUnique({
            where:{
                id:listingId
            },
            include:{
                user: true
            }
        });
        if(!listing){
            return null;
        }
        // return{
        // ...listing,
        // createdAt:listing.createdAt.toISOString(),
        // user:{
        //     ...listing.user,
        //     createdAt: listing.user.createdAt.toISOString(),
        //     updatedAt:listing.user.updatedAt.toISOString(),
        //     emailVerified:
        //     listing.user.emailVerified?.toISOString() || null,
        // }
        // };
        return listing;

    }catch(error: any){
        throw new Error(error);
    }
    
}