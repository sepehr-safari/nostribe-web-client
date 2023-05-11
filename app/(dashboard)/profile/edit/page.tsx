"use client";

import React, { useState, useEffect } from 'react';
import { nip19 } from 'nostr-tools';
import usePublish from '@/hooks/usePublish';
import useStore from '@/store';
import CardContainer from '@/components/CardContainer';
import {useProfileMetadata} from "@/hooks";
import Upload from "@/components/Upload";

const IMAGE_FIELDS = ['picture', 'banner'];

const EditProfile = () => {
  const [profile, setProfile] = useState({} as any);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const userData = useStore((state) => state.auth.user.data);
  const myNpub = userData?.publicKey ? nip19.npubEncode(userData?.publicKey) : '';

  const { latestMetadataEvent } = useProfileMetadata(userData?.publicKey || '');
  useEffect(() => {
    if (latestMetadataEvent) {
      try {
        const content = JSON.parse(latestMetadataEvent.content || '{}');
        setProfile(content);
      } catch (error) {
        console.log(error);
      }
    }
  }, [latestMetadataEvent]);

  const publish = usePublish();

  useEffect(() => {
    // Fetch user's profile data and update the state
  }, []);

  const handleProfileAttributeChange = (key: string, value: string) => {
    const updatedProfile = { ...profile, [key]: value };
    setProfile(updatedProfile);
    return updatedProfile;
  };

  const saveProfile = async (profile: any) => {
    Object.keys(profile).forEach((key) => {
      if (typeof profile[key] === 'string') {
        profile[key] = profile[key].trim();
      }
      if (!profile[key]) {
        delete profile[key];
      }
    });
    const content = JSON.stringify(profile);
    await publish({
      kind: 0,
      content,
      tags: latestMetadataEvent?.tags || [],
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveProfile(profile);
  };

  const handleAddField = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newFieldName && newFieldValue) {
      const updatedProfile = handleProfileAttributeChange(newFieldName, newFieldValue);
      setNewFieldName('');
      setNewFieldValue('');
      await saveProfile(updatedProfile);
    }
  };

  const renderProfileField = (key: string) => {
    const value = profile[key] || '';
    return (
      <div key={key} className="my-4">
        <label htmlFor={key}>{key}:</label>
        <br />
        <input
          className="input w-full"
          type="text"
          id={key}
          value={value}
          placeholder={key}
          onChange={(e) => handleProfileAttributeChange(key, e.target.value)}
        />
        {IMAGE_FIELDS.includes(key) && (
          <>
            <div className="mt-2">
              <Upload onUrl={(url) => handleProfileAttributeChange(key, url)} />
            </div>
            <div className="mt-2">
              {value && <img src={value} alt={key} className="rounded-sm h-32 object-cover" />}
            </div>
          </>
        )}
      </div>
    );
  }

  const renderProfileFields = () => {
    const defaultFields = ['name', 'picture', 'about', 'banner', 'website', 'lud16', 'nip05'];

    return (
      <>
        {defaultFields.map((field) => renderProfileField(field))}
        {Object.keys(profile).filter((key) => !defaultFields.includes(key)).map((key) => {
          return renderProfileField(key);
        })}
      </>
    );
  };

  return (
    <CardContainer>
      <div className="prose">
        <form onSubmit={handleSubmit} className="w-full">
          {renderProfileFields()}
          <button type="submit" className="btn btn-primary mt-4">
            Save
          </button>
        </form>
        <h4>Add new field</h4>
        <form onSubmit={(e) => handleAddField(e)}>
          <p>
            <label htmlFor="newFieldName">Field name:</label>
            <br />
            <input
              value={newFieldName}
              type="text"
              id="newFieldName"
              className="input w-full"
              onChange={(e) => setNewFieldName(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="newFieldValue">Field value:</label>
            <br />
            <input
              value={newFieldValue}
              type="text"
              id="newFieldValue"
              className="input"
              onChange={(e) => setNewFieldValue(e.target.value)}
            />
          </p>
          <p>
            <button type="submit" className="btn btn-primary">
              Add new attribute
            </button>
          </p>
        </form>
      </div>

    </CardContainer>);
};

export default EditProfile;
