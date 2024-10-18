import { ActionFunctionArgs, json } from '@remix-run/node';
import { pb } from '../services/db.server';

/**
 * currently this is completely unused
 * feel free to delete
 */
export async function loader({ request }: ActionFunctionArgs) {
  try {
    const authData = await pb.admins.authWithPassword(
      "xxx",
      "yyy"
    );
    console.log("xz:authData", authData);

    const list = await pb.collection("users").getFullList({
      sort: "-created",
    });
    console.log("xz:list1", list);
    pb.authStore.clear();

    const list2 = await pb.collection("users").getFullList({
      sort: "-created",
    });
    console.log("xz:list2", list2);
  } catch (error) {
    console.log("xz:error", error);
  }

  return json([]);
}
