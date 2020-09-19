class Diff
  # This sorts both remote data and local data by their uids and compares them.
  # Let's assume below are the uids of records.
  # local remote
  # 1       2
  # 4       3
  # 6       4
  # 7       5
  #         6
  #         7
  #         8
  #         9
  #
  # 1st pass 1 < 2 - delete 1 (present in local but not in remote)
  # 2nd pass 4 > 2 - create 2
  # 3rd pass 4 > 3 - create 3 (present in remote but not in local)
  # 4th pass 4 == 4 - update if different
  # 5th pass 6 > 5 - create 5
  # 6th pass 6 == 6 - update if different
  # 7th pass 7 == 7 - update if different
  # 8th pass - local empty
  #
  # add remaining 8, 9 to create list
  #
  def self.perform(local, remote, identifier: :uid, ignore: []) # rubocop:disable Metrics/PerceivedComplexity,Metrics/CyclomaticComplexity
    sorted_local = local.sort_by { |c| c[identifier] }
    sorted_remote = remote.sort_by { |c| c[identifier] }

    diff = {
      create: [],
      update: [],
      destroy: []
    }

    i = 0 # local iterator
    j = 0 # remote iterator

    while i < local.length && j < remote.length
      local_object = clean(sorted_local[i], ignore)
      remote_object = clean(sorted_remote[j], ignore)

      if local_object[identifier] == remote_object[identifier]
        is_updated = local_object != remote_object

        diff[:update] << sorted_remote[j] if is_updated

        j += 1
        i += 1
      elsif local_object[identifier] < remote_object[identifier]
        diff[:destroy] << sorted_local[i]
        i += 1
      else
        diff[:create] << sorted_remote[j]
        j += 1
      end
    end

    diff[:destroy] += sorted_local[i..local.length] if i != local.length
    diff[:create] += sorted_remote[j..remote.length] if j != remote.length
    diff
  end

  def self.clean(hash, ignored_paths)
    cloned_hash = hash.deep_dup

    ignored_paths.each do |ignored_path|
      *path, final_key = ignored_path
      to_delete = path.empty? ? cloned_hash : cloned_hash.dig(*path)

      to_delete.except! final_key if to_delete.present?
    end

    cloned_hash
  end
end
