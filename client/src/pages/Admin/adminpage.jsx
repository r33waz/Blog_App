import React from 'react'
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import UserTab from './usereidit';
import EiditBlog from '../Blogs/eidit_blogs';

function AdminPage() {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <Tab.Group>
          <Tab.List className="flex flex-wrap gap-4 p-3 mt-4 font-semibold bg-black rounded-md md:gap-x-64 gap-x-40 lg:gap-x-96">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-blue-500 text-white p-1 rounded-md w-full outline-none active:outline-stone-200"
                      : "bg-white text-black p-1 rounded-md w-full"
                  }
                >
                  Users Details
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-blue-500 text-white p-1 rounded-md w-full outline-none focus:outline-stone-200"
                      : "bg-white text-black p-1 rounded-md w-full"
                  }
                >
                  Posts Details
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel><UserTab/></Tab.Panel>
            <Tab.Panel><EiditBlog/> </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

export default AdminPage