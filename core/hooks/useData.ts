import { ref, onValue, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../firebase";
import { ShopingItem } from "../types";

type UseData = (uid?: string) => {
  getList: () => void;
  addItem: (name: string) => void;
  updateItem: (payload: ShopingItem) => void;
  list: ShopingItem[];
  loading: boolean;
};

export const useData: UseData = (uid) => {
  const [list, setList] = useState<ShopingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (uid) {
      setLoading(false);
    }
  }, [uid]);

  const path = `users/${uid}/shopingList`;

  const getList = () => {
    if (path) {
      setLoading(true);
      const shopingListReference = ref(database, path);
      onValue(shopingListReference, (snapshot) => {
        const data = snapshot.val() as Record<string, ShopingItem>;
        const keys = Object.keys(data);
        const tranformedData: ShopingItem[] = keys.map((key) => {
          return data[key];
        });
        setLoading(false);
        setList(tranformedData || []);
      });
    }
  };

  const addItem = (name: string) => {
    if (path) {
      const newList = [...list];
      const newItem = {
        name,
        count: 1,
        done: false,
        added: new Date().toISOString(),
      };
      newList.push(newItem);
      setList(newList);
      try {
        set(ref(database, `${path}/${name}`), newItem);
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  const updateItem = (payload: ShopingItem) => {
    console.log("path", path);
    if (path) {
      console.log("update", payload);
      try {
        update(ref(database, `${path}/${payload.name}`), payload);
        getList();
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  return { getList, addItem, updateItem, list, loading };
};
