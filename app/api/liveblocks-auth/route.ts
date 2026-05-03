import { currentUser } from "@clerk/nextjs/server";
import { getLiveblocks, getUserColor } from "@/lib/liveblocks";
import {
    getCurrentProjectIdentity,
    userHasProjectAccess,
} from "@/lib/project-access";

export async function POST(request: Request) {

    const secret = process.env.LIVEBLOCKS_SECRET_KEY!;

    console.log("SECRET RAW:", JSON.stringify(secret));
    console.log("LENGTH:", secret?.length);
    console.log("FIRST:", secret?.slice(0, 5));
    console.log("LAST:", secret?.slice(-5));
    
    const identity = await getCurrentProjectIdentity();

    if (!identity.userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { room } = await request.json();

    if (!room || typeof room !== "string") {
        return new Response("Bad Request", { status: 400 });
    }

    const hasAccess = await userHasProjectAccess(room, identity);

    if (!hasAccess) {
        return new Response("Forbidden", { status: 403 });
    }

    const lb = getLiveblocks();

    await lb.getOrCreateRoom(room, { defaultAccesses: [] });

    const user = await currentUser();
    const name =
        user?.fullName ??
        user?.primaryEmailAddress?.emailAddress ??
        "Anonymous";
    const avatar = user?.imageUrl ?? "";
    const color = getUserColor(identity.userId);

    const session = lb.prepareSession(identity.userId, {
        userInfo: { name, avatar, color },
    });

    session.allow(room, session.FULL_ACCESS);

    const { status, body } = await session.authorize();
    return new Response(body, { status });
}